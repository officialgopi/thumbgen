// components/Hero.jsx
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [_uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as any);
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <section className="relative pt-[150px] pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-neutral-50 to-neutral-100 overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-neutral-200 rounded-3xl transform rotate-12 skew-y-6 opacity-60 blur-sm"></div>
        <div className="absolute top-40 right-20 w-80 h-80 bg-neutral-300 rounded-2xl transform -rotate-6 skew-x-3 opacity-40 blur-sm"></div>
        <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-neutral-250 rounded-3xl transform rotate-45 skew-y-12 opacity-30 blur-md"></div>
        <div className="absolute top-1/3 right-10 w-48 h-48 bg-neutral-200 rounded-xl transform -rotate-12 skew-x-6 opacity-50 blur-sm"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          {/* Left Column - Text Content */}
          <div className="lg:col-span-6">
            <div className="space-y-8">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-neutral-300 shadow-sm">
                  <span className="w-2 h-2 bg-neutral-800 rounded-full mr-3"></span>
                  <span className="text-sm font-medium text-neutral-700">
                    AI-Powered Design
                  </span>
                </div>

                <div className="relative">
                  {/* 3D Perspective Element Behind Text */}
                  <div className="absolute -top-8 -left-8 w-72 h-32 bg-neutral-800 rounded-2xl transform rotate-3 skew-y-1 opacity-10 blur-sm"></div>
                  <div className="absolute -top-4 -left-4 w-64 h-28 bg-neutral-700 rounded-xl transform rotate-1 skew-y-2 opacity-15 blur-sm"></div>

                  <h1 className="relative text-4xl sm:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
                    Professional
                    <span className="relative block lg:inline">
                      <span className="relative before:top-[50%] before:left-[50%]   before:h-[105%] before:bg-amber-100 text-transparent bg-clip-text bg-gradient-to-r from-neutral-700 to-neutral-900">
                        {" "}
                        Thumbnail Creation
                      </span>
                    </span>
                    <span className="block">Made Simple</span>
                  </h1>
                </div>

                <p className="text-xl text-neutral-600 max-w-xl leading-relaxed">
                  Elevate your content strategy with AI-generated thumbnails
                  designed to maximize engagement. Professional quality visuals
                  that align with your brand identity.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="px-8 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  Generate Thumbnail
                </Button>
                <Button
                  variant="outline"
                  className="px-8 py-4 border-neutral-300 text-neutral-700 font-semibold hover:bg-neutral-50"
                >
                  Browse Templates
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8 border-t border-neutral-200">
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    10K+
                  </div>
                  <div className="text-sm text-neutral-600">
                    Thumbnails Generated
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">98%</div>
                  <div className="text-sm text-neutral-600">
                    Satisfaction Rate
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-neutral-900">
                    5 sec
                  </div>
                  <div className="text-sm text-neutral-600">
                    Average Generation
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Upload Interface */}
          <div className="lg:col-span-6 mt-16 lg:mt-0">
            <div className="relative">
              {/* 3D Background for Upload Card */}
              <div className="absolute inset-0 transform rotate-1 scale-105">
                <div className="w-full h-full bg-neutral-300 rounded-2xl opacity-20 blur-sm"></div>
              </div>
              <div className="absolute inset-0 transform -rotate-1 scale-102">
                <div className="w-full h-full bg-neutral-400 rounded-2xl opacity-15 blur-md"></div>
              </div>

              <div className="relative bg-white rounded-2xl shadow-xl border border-neutral-200 p-8">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Upload Your Image
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    Drag and drop or click to select an image file
                  </p>
                </div>

                {/* Upload Area */}
                <div
                  className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 cursor-pointer group relative"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() =>
                    document.getElementById("file-upload")?.click()
                  }
                >
                  {/* Subtle 3D background for upload area */}
                  <div className="absolute inset-0 transform rotate-1 opacity-5">
                    <div className="w-full h-full bg-neutral-600 rounded-xl blur-sm"></div>
                  </div>

                  <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {!previewUrl ? (
                    <div className="relative space-y-4">
                      <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                        <svg
                          className="w-8 h-8 text-neutral-500 group-hover:text-neutral-700 transition-colors"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="text-neutral-700 font-medium mb-1">
                          Choose a file or drag it here
                        </p>
                        <p className="text-neutral-500 text-sm">
                          PNG, JPG, GIF up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative space-y-4">
                      {/* Preview with 3D effect */}
                      <div className="relative">
                        <div className="absolute inset-0 transform rotate-1 translate-x-2 translate-y-2">
                          <div className="w-full h-48 bg-neutral-300 rounded-lg opacity-30 blur-sm"></div>
                        </div>
                        <div className="relative w-full h-48 bg-neutral-100 rounded-lg overflow-hidden shadow-lg">
                          <img
                            src={previewUrl}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />

                          {/* Professional Overlay Preview */}
                          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/80 via-transparent to-transparent"></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-neutral-800 text-white px-3 py-1 rounded-md text-xs font-semibold inline-block mb-2">
                              PROFESSIONAL
                            </div>
                            <h4 className="text-white text-lg font-bold">
                              Your Content Title Here
                            </h4>
                            <p className="text-neutral-300 text-sm mt-1">
                              Enhanced with AI-powered design
                            </p>
                          </div>

                          {/* Professional Play Button */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-lg">
                              <svg
                                className="w-6 h-6 text-neutral-800 ml-1"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setPreviewUrl(null);
                          setUploadedFile(null);
                        }}
                        className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        Upload Different Image
                      </Button>
                    </div>
                  )}
                </div>

                {/* Processing Steps Preview */}
                <div className="mt-6 pt-6 border-t border-neutral-200">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                      <span className="text-neutral-600">AI Analysis</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neutral-300 rounded-full"></div>
                      <span className="text-neutral-600">
                        Design Generation
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-neutral-800 rounded-full"></div>
                      <span className="text-neutral-600">
                        Ready to Download
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating 3D Elements for Visual Interest */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-neutral-200 rounded-full opacity-40 blur-xl transform rotate-12"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-neutral-300 rounded-full opacity-30 blur-xl transform -rotate-6"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
