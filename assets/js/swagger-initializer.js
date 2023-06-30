window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: "api-spec.yaml",
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [SwaggerUIBundle.presets.apis],
  });
};
