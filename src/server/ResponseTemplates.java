package server;

public enum ResponseTemplates {
    HTTP_RESPONSE("""
            HTTP/1.1 200 OK
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """),
    HTTP_ERROR("""
            HTTP/1.1 400 Bad Request
            Content-Type: application/json
            Content-Length: %d
            
            %s
            """),
    RESULT_JSON("""
            {
                "time": "%s",
                "now": "%s",
                "result": %b
            }
            """),
    ERROR_JSON("""
            {
                "now": "%s",
                "reason": "%s"
            }
            """);

    private final String template;

    ResponseTemplates(String template) {
        this.template = template;
    }

    public String getTemplate() {
        return template;
    }
}
