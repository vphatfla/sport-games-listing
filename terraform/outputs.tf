output "frontend_cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "backend_alb_dns" {
  value = aws_lb.backend_alb.dns_name
}

