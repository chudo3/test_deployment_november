export default function ThankYou() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh", // Full viewport height
                textAlign: "center", // Center the text
            }}
        >
            <h1 style={{ fontSize: "3rem", margin: "0.5rem" }}>Thank You!</h1>
            <p style={{ fontSize: "1.5rem", margin: "0.5rem" }}>
                Your improvement plan has been sent to your email.
            </p>
        </div>
    );
}
