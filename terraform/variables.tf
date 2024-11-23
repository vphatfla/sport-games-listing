variable "region" {
  description = "AWS region to deploy the app"
  type        = string
  default     = "us-east-2"
}

variable "cluster_id" {
  description = "ECS cluster ID for backend and database"
  type        = string
}

variable "subnet_ids" {
  description = "List of public subnet IDs"
  type        = list(string)
}

variable "vpc_id" {
  description = "VPC ID where the resources will be deployed"
  type        = string
}

variable "backend_image" {
  description = "Docker image URL for the backend"
  type        = string
}

variable "frontend_bucket_name" {
  description = "Name of the S3 bucket for the frontend"
  type        = string
  default     = "sport-listing-frontend-bucket"
}

variable "database_image" {
  description = "Docker image URL for the database"
  type        = string
}

variable "backend_security_group" {
  description = "Security group ID for backend ECS tasks"
  type        = string
}

variable "database_security_group" {
  description = "Security group ID for database ECS tasks"
  type        = string
}

variable "backend_target_group_name" {
  description = "Name of the backend target group for ALB"
  type        = string
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)"
  type        = string
  default     = "dev"
}

