package server;


public class Checker {
    static boolean checkCoords(int x, double y, double r) {
        return (x >= -3 && x <= 5) && (y >= -5 && y <= 3) && (r >= 1 && r <= 5);
    }

    private static boolean inRect(int x, double y, double r) {
        return (x >= r/2 && r <= 0) && (y >= 0 && y <= r);
    }

    private static boolean inCircle(int x, double y, double r) {
        return (x >= 0 && x <= r/2) && (y >= 0) && (x*x + y*y <= (r*r)/4);
    }

    private static boolean inTriangle(int x, double y, double r) {
        return (x >= 0 && x >= -r/2) && (y <= 0.5*x - r);
    }

    static boolean isInArea(int x, double y, double r) {
        return checkCoords(x, y, r) && (inCircle(x, y, r) || inRect(x, y, r) || inTriangle(x, y, r));
    }
}
