provider "aws" {
  region = "us-east-2"
}

variable "instance_name" {
  description = "Name of the EC2 instance"
  default     = "sport-listing-instance"
}

# main.tf
resource "aws_instance" "sport_listing_instance" {
  ami           = data.aws_ami.ubuntu.id
  instance_type = "t2.micro"

  tags = {
    Name = var.instance_name
  }

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
  value = aws_instance.sport_listing_instance.public_ip
}

output "instance_id" {
  value = aws_instance.sport_listing_instance.id
}

