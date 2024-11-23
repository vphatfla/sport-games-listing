output "frontend_cloudfront_url" {
  description = "CloudFront distribution URL for the frontend"
  value       = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "backend_alb_dns" {
  description = "ALB DNS name for the backend"
  value       = aws_lb.backend_alb.dns_name
}

