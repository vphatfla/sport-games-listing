variable "region" {
    description = "AWS region for deployment"
    type = string
    default = "us-east-2"
}

variable "vpc_cidr_block" {
  description = "CIDR block for the VPC"
  type        = string
  default     = "10.0.0.0/16"
}

variable "project_name" {
  description = "Name of the project"
  type        = string
  default     = "sport-listing"
}
