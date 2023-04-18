interface Base64ImageProps {
    img: string;
    width: string;
    height: string;
}

function Base64Image({ img, width, height }: Base64ImageProps) {
    return (
        <img
            src={`data:image/(jpeg|png|bmp|jpg);base64,${img}`}
            alt="Uploaded image"
            style={{
                width: width,
                height: height,
                objectFit: "cover",
                border: "0.1em solid black",
            }}
        />
    );
}

export default Base64Image;
