provider "aws" {
    region = var.region
}

module "vpc" {
    source = "./vpc"
    project_name = var.project_name
    vpc_cidr_block = var.vpc_cidr_block  
}

module "iam" {
    source = "./iam"
    project_name = var.project_name
}

module "security" {
    source = "./security"
    vpc_id = module.vpc.vpc_id
    project_name = var.project_name
}
