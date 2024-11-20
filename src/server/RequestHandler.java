package server;

import com.fastcgi.*;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Map;
import java.io.FileInputStream;

public class RequestHandler {
    private final FCGIInterface fcgi;

    public RequestHandler(FCGIInterface fcgi) {
        this.fcgi = fcgi;
    }

    public void start() {
        while (fcgi.FCGIaccept() >= 0) {
            try {
                String requestBody = readRequestBody();

                Map<String, Object> params = JsonParser.parse(requestBody);

                int x = (int) params.get("x");
                double y = (double) params.get("y");
                double r = (double) params.get("r");

                boolean result = Checker.isInArea(x, y, r);

                String jsonResponse = String.format(
                        ResponseTemplates.RESULT_JSON.getTemplate(),
                        LocalDateTime.now(), LocalDateTime.now(), result);

                String response = String.format(
                        ResponseTemplates.HTTP_RESPONSE.getTemplate(),
                        jsonResponse.getBytes(StandardCharsets.UTF_8).length, jsonResponse);

                JsonSender.sendJson(response);

            } catch (Exception e) {
                String errorJson = String.format(
                        ResponseTemplates.ERROR_JSON.getTemplate(),
                        LocalDateTime.now(), e.getMessage());

                String errorResponse = String.format(
                        ResponseTemplates.HTTP_ERROR.getTemplate(),
                        errorJson.getBytes(StandardCharsets.UTF_8).length, errorJson);

                JsonSender.sendJson(errorResponse);
            }
        }

        public void handlePostRequest(FileInputStream inStream) {
            try {
                int bufLen = 1024;
                int streamType = 1;  // Тип потока данных
                FCGIRequest request = new FCGIRequest();
                FCGIInputStream fcgiInputStream = new FCGIInputStream(inStream, bufLen, streamType, request);

                // Чтение данных
                byte[] data = new byte[4096];
                int bytesRead = fcgiInputStream.read(data);
                if (bytesRead != -1) {
                    String receivedData = new String(data, 0, bytesRead);
                    System.out.println("Received POST data: " + receivedData);
                }

                // Завершение работы с потоком
                fcgiInputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

//    private String readRequestBody() {
//        StringBuilder requestBody = new StringBuilder();
//
//        try {
//            System.setIn(fcgi.request.inStream);
//            String line;
//
//            while ((System.in.read()) != null) {
//                requestBody.append(line);
//            }
//        } catch (IOException e) {
//            throw new RuntimeException("Ошибка при чтении тела запроса: ", e);
//        }
//
//        return requestBody.toString();
//    }
}
