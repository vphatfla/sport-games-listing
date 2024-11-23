resource "aws_ecs_task_definition" "database_task" {
  family                   = "database-task"
  requires_compatibilities = ["FARGATE"]
  cpu                      = "256"
  memory                   = "512"

  container_definitions = jsonencode([
    {
      name      = "database"
      image     = var.database_image
      essential = true
      portMappings = [{
        containerPort = 27017
      }]
    }
  ])
}

resource "aws_ecs_service" "database_service" {
  name            = "database-service"
  cluster         = var.cluster_id
  task_definition = aws_ecs_task_definition.database_task.arn
  desired_count   = 1

  capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 1
  }

  network_configuration {
    subnets         = var.subnet_ids
    security_groups = [var.database_security_group]
  }
}

