resource "aws_ecs_task_definition" "backend_task" {
  family                   = "backend-task"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "backend"
      image     = var.backend_image
      essential = true
      portMappings = [{
        containerPort = 3000
      }]
    }
  ])
}

resource "aws_ecs_service" "backend_service" {
  name            = "backend-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.backend_task.arn
  desired_count   = 1

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
  }

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [var.backend_security_group]
  }
}

