provider "aws" {
  region = var.region
}

module "backend" {
  source          = "./backend.tf"
  backend_image   = var.backend_image
  cluster_id      = var.cluster_id
  subnet_ids      = var.subnet_ids
  security_groups = [var.backend_security_group]
}

module "frontend" {
  source                = "./frontend.tf"
  frontend_bucket_name  = var.frontend_bucket_name
  environment           = var.environment
}

module "database" {
  source          = "./database.tf"
  database_image  = var.database_image
  cluster_id      = var.cluster_id
  subnet_ids      = var.subnet_ids
  security_groups = [var.database_security_group]
}

module "alb" {
  source          = "./alb.tf"
  vpc_id          = var.vpc_id
  subnet_ids      = var.subnet_ids
  backend_tg_name = var.backend_target_group_name
  backend_service = module.backend.backend_service
}

