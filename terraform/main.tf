# main.tf
provider "aws" {
  region = "us-east-2"
}

variable "instance_name" {
  description = "Name of the EC2 instance"
  default     = "sport-listing-instance"
}

resource "aws_instance" "sport_listing_instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  vpc_security_group_ids = [aws_security_group.sport_listing_sg.id] # Attach the SG

  tags = {
    Name = var.instance_name
  }
}

resource "aws_security_group" "sport_listing_sg" {
  name        = "sport-listing-sg"
  description = "Allow SSH, HTTP, and HTTPS traffic"

  # Ingress Rules (Allow inbound traffic)
  ingress {
    description = "Allow SSH"
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Public access
  }

  ingress {
    description = "Allow HTTP"
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Public access
  }

  ingress {
    description = "Allow HTTPS"
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Public access
  }

  # Egress Rules (Allow all outbound traffic)
  egress {
    description = "Allow all outbound traffic"
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"] # Public access
  }

  tags = {
    Name = "SportListingSG"
  }
}

resource "aws_eip" "sport_listing_eip" {
  instance = aws_instance.sport_listing_instance.id
  domain      = "vpc"
}

# data.tf
data "aws_ami" "ubuntu" {
  most_recent = true

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-focal-20.04-amd64-server-*"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }

  owners = ["099720109477"] # Canonical's AWS account ID for Ubuntu
}

# outputs.tf
output "instance_public_ip" {
  value = aws_eip.sport_listing_eip.public_ip
}

output "instance_id" {
  value = aws_instance.sport_listing_instance.id
}

