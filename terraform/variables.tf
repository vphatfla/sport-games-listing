variable "region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-2"
}

variable "cluster_id" {
  description = "ECS cluster ID"
  type        = string
}

variable "subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC ID for the deployment"
  type        = string
}

variable "backend_image" {
  description = "Docker image URL for the backend"
  type        = string
}

variable "frontend_bucket_name" {
  description = "Name of the S3 bucket for the frontend"
  type        = string
  default     = "contactmanagerteamone-frontend"
}

variable "domain_name" {
  description = "Domain name for the app"
  type        = string
  default     = "contactmanagerteamone.one"
}

variable "backend_security_group" {
  description = "Security group ID for backend ECS tasks"
  type        = string
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)"
  type        = string
  default     = "dev"
}

variable "route53_host_zone_id" {
    description = "Host zone for contactmanagerteamone.one"
    type = string
    default = "Z10156963314SAUFOJNPS"
}
