resource "aws_route53_record" "root_record" {
  zone_id = var.route53_host_zone_id
  name    = var.domain_name
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.frontend_cdn.domain_name
    zone_id                = aws_cloudfront_distribution.frontend_cdn.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "api_record" {
  zone_id = var.route53_host_zone_id 
  name    = "api.${var.domain_name}"
  type    = "A"

  alias {
    name                   = aws_lb.backend_alb.dns_name
    zone_id                = aws_lb.backend_alb.zone_id
    evaluate_target_health = false
  }
}

