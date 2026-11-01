function Gallery() {
  const images = [
    "/images/a.avif",
    "/images/b.jpg",
    "/images/c.jpg"
  ];
  return (
    <div className="page">
      <h1>Gallery</h1>
      <div className="gallery-grid">
        {images.map((src, index) => (
          <img key={index} src={src} alt="TechFest" />
        ))}
      </div>
    </div>
  );
}
export default Gallery;
