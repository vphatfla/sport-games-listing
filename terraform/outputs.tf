output "cloudfront_url" {
  value = aws_cloudfront_distribution.frontend_cdn.domain_name
}

output "api_url" {
  value = aws_route53_record.backend_record.fqdn
}

