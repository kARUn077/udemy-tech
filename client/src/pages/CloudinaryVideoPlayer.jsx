import React from "react";
import ReactPlayer from "react-player";

const CloudinaryVideoPlayer = () => {
  const videoUrl = "https://res.cloudinary.com/dulrzkrkg/video/upload/v1750969674/oczusptbik48pxflbjbp.mp4";

  // const videoUrl ="https://res.cloudinary.com/dulrzkrkg/video/upload/f_auto:video,q_auto/lrntjpws9yp6pgcnzpqw";
  return (
    <div className="w-full max-w-2xl mx-auto my-10 space-y-6">
      <h2 className="text-xl font-bold text-center">ReactPlayer Example</h2>

      {/* Using ReactPlayer */}
      <div className="aspect-video rounded overflow-hidden">
        <ReactPlayer
          url={videoUrl}
          width="100%"
          height="100%"
          controls
          config={{
            file: {
              attributes: {
                crossOrigin: "anonymous",
              },
            },
          }}
        />
      </div>

      {/* Optional: fallback <video> tag */}
      <h2 className="text-xl font-bold text-center">
        Native &lt;video&gt; Tag Example
      </h2>
      <video
        controls
        width="100%"
        crossOrigin="anonymous"
        className="rounded border"
        // style={{ maxHeight: "480px" }}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default CloudinaryVideoPlayer;
