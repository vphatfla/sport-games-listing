resource "aws_lb" "backend_alb" {
  name               = "backend-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [var.backend_security_group]
  subnets            = var.subnet_ids
}

resource "aws_lb_target_group" "backend_tg" {
  name     = var.backend_target_group_name
  port     = 3000
  protocol = "HTTP"
  vpc_id   = var.vpc_id
}

