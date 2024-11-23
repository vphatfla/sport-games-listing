variable "frontend_bucket_name" {
  description = "S3 bucket name for the frontend"
  type        = string
  default     = "sport-listing-frontend"
}

variable "backend_image_url" {
  description = "ECR URL for the backend image"
  type        = string
}

variable "domain_name" {
  description = "Main domain name for the application"
  type        = string
  default     = "contactmanagerteamone.one"
}

variable "api_subdomain" {
  description = "Subdomain for the API (backend)"
  type        = string
  default     = "api.contactmanagerteamone.one"
}

