provider "aws" {
  region = var.region
}

# Backend Module
module "backend" {
  source          = "./backend.tf"
  backend_image   = var.backend_image
  cluster_id      = var.cluster_id
  subnet_ids      = var.subnet_ids
  security_groups = [var.backend_security_group]
}

# Frontend Module
module "frontend" {
  source                = "./frontend.tf"
  frontend_bucket_name  = var.frontend_bucket_name
  environment           = var.environment
}

# ALB Module
module "alb" {
  source               = "./alb.tf"
  vpc_id               = var.vpc_id
  subnet_ids           = var.subnet_ids
  backend_target_group = module.backend.target_group_arn
}

# Route 53 DNS Module
module "dns" {
  source          = "./dns.tf"
  domain_name     = var.domain_name
  cloudfront_url  = module.frontend.cloudfront_url
  backend_alb_dns = module.alb.alb_dns_name
}

