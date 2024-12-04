package server;

public class RequestData {
    private final int x;
    private final float y;
    private final int r;

    public RequestData(int x, float y, int r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public int getX() {
        return x;
    }

    public float getY() {
        return y;
    }

    public int getR() {
        return r;
    }

    @Override
    public String toString() {
        return String.format("RequestData{x=%d, y=%.2f, r=%d}", x, y, r);
    }
}
