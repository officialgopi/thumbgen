import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/store/user.store";
import { env } from "@/constants/env.constant";

interface GenerateFormData {
  prompt?: string;
  fontOptions: {
    mainTitle: string;
    description: string;
    fontStyle:
      | "modern"
      | "bold"
      | "handwritten"
      | "playful"
      | "professional"
      | "casual"
      | "funny"
      | "romantic";
    fontColor: string;
    backgroundColor: string;
    fontSize: "very-small" | "small" | "medium" | "large" | "very-large";
    fontFamily: string;
  };
  photoOptions: {
    backgroundType:
      | "blur-the-uploaded-photo"
      | "solid-background"
      | "gradient-background"
      | "ai-generated-background";
    someDetailAboutBackground: string;
  };
  thumbnailElements: {
    ctaBadge: string;
  };
  outputPreferences: {
    thumbnailSize:
      | "1280x720"
      | "1920x1080"
      | "1080x1080"
      | "1080x1350"
      | "1080x1920"
      | "1200x627"
      | "1584x396";
    downloadFormat: "png" | "jpg" | "jpeg" | "webp";
    downloadQuality: "low" | "medium" | "high";
  };
}

const MainPage = () => {
  const { user } = useUser();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [inputImage, setInputImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<GenerateFormData>({
    prompt: "",
    fontOptions: {
      mainTitle: "",
      description: "",
      fontStyle: "modern",
      fontColor: "black",
      backgroundColor: "white",
      fontSize: "medium",
      fontFamily: "Inter",
    },
    photoOptions: {
      backgroundType: "ai-generated-background",
      someDetailAboutBackground: "",
    },
    thumbnailElements: {
      ctaBadge: "Watch Now or Miss",
    },
    outputPreferences: {
      thumbnailSize: "1280x720",
      downloadFormat: "png",
      downloadQuality: "medium",
    },
  });

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreviewUrl(e.target?.result as string);
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

  const handleInputChange = (
    section: keyof GenerateFormData,
    field: string,
    value: any
  ) => {
    setFormData((prev: GenerateFormData) => ({
      ...prev,
      [section]: {
        ...(prev[section] as any),
        [field]: value,
      },
    }));
  };

  const handleGenerate = async () => {
    if (!uploadedFile || !user) return;

    setIsGenerating(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("thumbnail-context", uploadedFile);
      formDataToSend.append("data", JSON.stringify(formData));

      const response = await fetch(`${env.server}/api/v1/generate`, {
        method: "POST",
        headers: {
          Authorization: localStorage.getItem("access-token") || "",
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (result.success) {
        setInputImage(result.data.inputImage);
        setGeneratedImage(result.data.generatedImage);
      } else {
        console.error("Generation failed:", result.message);
      }
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const fontStyles = [
    { value: "modern", label: "Modern", description: "Clean and contemporary" },
    { value: "bold", label: "Bold", description: "Strong and impactful" },
    {
      value: "handwritten",
      label: "Handwritten",
      description: "Personal and authentic",
    },
    { value: "playful", label: "Playful", description: "Fun and energetic" },
    {
      value: "professional",
      label: "Professional",
      description: "Business-ready",
    },
    { value: "casual", label: "Casual", description: "Relaxed and friendly" },
    { value: "funny", label: "Funny", description: "Humorous and engaging" },
    {
      value: "romantic",
      label: "Romantic",
      description: "Elegant and sophisticated",
    },
  ];

  const backgroundTypes = [
    {
      value: "blur-the-uploaded-photo",
      label: "Blur Uploaded Photo",
      description: "Blur your uploaded image",
    },
    {
      value: "solid-background",
      label: "Solid Background",
      description: "Single color background",
    },
    {
      value: "gradient-background",
      label: "Gradient Background",
      description: "Smooth color transitions",
    },
    {
      value: "ai-generated-background",
      label: "AI Generated Background",
      description: "AI creates custom background",
    },
  ];

  const thumbnailSizes = [
    {
      value: "1280x720",
      label: "YouTube Thumbnail",
      description: "1280×720 (16:9)",
    },
    {
      value: "1920x1080",
      label: "HD Universal",
      description: "1920×1080 (16:9)",
    },
    {
      value: "1080x1080",
      label: "Instagram Post",
      description: "1080×1080 (1:1)",
    },
    {
      value: "1080x1350",
      label: "Instagram Portrait",
      description: "1080×1350 (4:5)",
    },
    {
      value: "1080x1920",
      label: "Reels/TikTok",
      description: "1080×1920 (9:16)",
    },
    {
      value: "1200x627",
      label: "LinkedIn/Twitter",
      description: "1200×627 (1.91:1)",
    },
    {
      value: "1584x396",
      label: "LinkedIn Banner",
      description: "1584×396 (4:1)",
    },
  ];

  const fontSizes = [
    { value: "very-small", label: "Very Small" },
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
    { value: "very-large", label: "Very Large" },
  ];

  const downloadFormats = [
    {
      value: "png",
      label: "PNG",
      description: "High quality, transparent background",
    },
    {
      value: "jpg",
      label: "JPG",
      description: "Smaller file size, good quality",
    },
    { value: "jpeg", label: "JPEG", description: "Standard web format" },
    { value: "webp", label: "WebP", description: "Modern, optimized format" },
  ];

  const downloadQualities = [
    { value: "low", label: "Low", description: "Smaller file size" },
    { value: "medium", label: "Medium", description: "Balanced quality" },
    { value: "high", label: "High", description: "Best quality" },
  ];

  // if (!user) {
  //   return (
  //     <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
  //       <div className="text-center">
  //         <h1 className="text-2xl font-bold text-white mb-4">
  //           Please sign in to continue
  //         </h1>
  //         <Button onClick={() => (window.location.href = "/")}>
  //           Go to Landing Page
  //         </Button>
  //       </div>
  //     </div>
  //   );
  // }
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-neutral-900 rounded-lg flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-xl font-semibold text-neutral-900">
                ThumbGen
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="outline" className="text-neutral-600">
                Credits: {user?.credits ?? 0}
              </Badge>
              <div className="flex items-center space-x-2">
                <img
                  src={user?.avatar}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="text-sm font-medium text-neutral-700">
                  {user?.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Upload Your Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  className="border-2 border-dashed border-neutral-300 rounded-xl p-8 text-center hover:border-neutral-400 hover:bg-neutral-50 transition-all duration-200 cursor-pointer"
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileInput}
                    className="hidden"
                  />

                  {!previewUrl ? (
                    <div className="space-y-4">
                      <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-neutral-500"
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
                    <div className="space-y-4">
                      <div className="relative w-full h-48 bg-neutral-100 rounded-lg overflow-hidden">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setPreviewUrl(null);
                          setUploadedFile(null);
                        }}
                        className="border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                      >
                        Upload Different Image
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Text Content */}
            <Card>
              <CardHeader>
                <CardTitle>Main Prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Prompt
                  </label>
                  <textarea
                    value={formData.prompt}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        prompt: e.target.value,
                      })
                    }
                    placeholder="Enter your main title"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Text Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Main Title
                  </label>
                  <input
                    type="text"
                    value={formData.fontOptions.mainTitle}
                    onChange={(e) =>
                      handleInputChange(
                        "fontOptions",
                        "mainTitle",
                        e.target.value
                      )
                    }
                    placeholder="Enter your main title"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.fontOptions.description}
                    onChange={(e) =>
                      handleInputChange(
                        "fontOptions",
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter description text"
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    CTA Badge
                  </label>
                  <input
                    type="text"
                    value={formData.thumbnailElements.ctaBadge}
                    onChange={(e) =>
                      handleInputChange(
                        "thumbnailElements",
                        "ctaBadge",
                        e.target.value
                      )
                    }
                    placeholder="Call-to-action text"
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Font Options */}
            <Card>
              <CardHeader>
                <CardTitle>Font & Style Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Font Style
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {fontStyles.map((style) => (
                      <button
                        key={style.value}
                        onClick={() =>
                          handleInputChange(
                            "fontOptions",
                            "fontStyle",
                            style.value
                          )
                        }
                        className={`p-3 text-left rounded-lg border transition-all ${
                          formData.fontOptions.fontStyle === style.value
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        <div className="font-medium text-sm">{style.label}</div>
                        <div className="text-xs opacity-75">
                          {style.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Font Color
                    </label>
                    <input
                      type="color"
                      value={formData.fontOptions.fontColor}
                      onChange={(e) =>
                        handleInputChange(
                          "fontOptions",
                          "fontColor",
                          e.target.value
                        )
                      }
                      className="w-full h-10 border border-neutral-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={formData.fontOptions.backgroundColor}
                      onChange={(e) =>
                        handleInputChange(
                          "fontOptions",
                          "backgroundColor",
                          e.target.value
                        )
                      }
                      className="w-full h-10 border border-neutral-300 rounded-lg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Font Size
                    </label>
                    <select
                      value={formData.fontOptions.fontSize}
                      onChange={(e) =>
                        handleInputChange(
                          "fontOptions",
                          "fontSize",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                    >
                      {fontSizes.map((size) => (
                        <option key={size.value} value={size.value}>
                          {size.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Font Family
                    </label>
                    <input
                      type="text"
                      value={formData.fontOptions.fontFamily}
                      onChange={(e) =>
                        handleInputChange(
                          "fontOptions",
                          "fontFamily",
                          e.target.value
                        )
                      }
                      placeholder="e.g., Inter, Arial, Roboto"
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Background Options */}
            <Card>
              <CardHeader>
                <CardTitle>Background Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Background Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {backgroundTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() =>
                          handleInputChange(
                            "photoOptions",
                            "backgroundType",
                            type.value
                          )
                        }
                        className={`p-3 text-left rounded-lg border transition-all ${
                          formData.photoOptions.backgroundType === type.value
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        <div className="font-medium text-sm">{type.label}</div>
                        <div className="text-xs opacity-75">
                          {type.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Background Details
                  </label>
                  <textarea
                    value={formData.photoOptions.someDetailAboutBackground}
                    onChange={(e) =>
                      handleInputChange(
                        "photoOptions",
                        "someDetailAboutBackground",
                        e.target.value
                      )
                    }
                    placeholder="Describe the background you want..."
                    rows={3}
                    className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-neutral-500 focus:border-transparent"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Output Preferences */}
            <Card>
              <CardHeader>
                <CardTitle>Output Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Thumbnail Size
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {thumbnailSizes.map((size) => (
                      <button
                        key={size.value}
                        onClick={() =>
                          handleInputChange(
                            "outputPreferences",
                            "thumbnailSize",
                            size.value
                          )
                        }
                        className={`p-3 text-left rounded-lg border transition-all ${
                          formData.outputPreferences.thumbnailSize ===
                          size.value
                            ? "border-neutral-900 bg-neutral-900 text-white"
                            : "border-neutral-300 hover:border-neutral-400"
                        }`}
                      >
                        <div className="font-medium text-sm">{size.label}</div>
                        <div className="text-xs opacity-75">
                          {size.description}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Download Format
                    </label>
                    <div className="space-y-2">
                      {downloadFormats.map((format) => (
                        <button
                          key={format.value}
                          onClick={() =>
                            handleInputChange(
                              "outputPreferences",
                              "downloadFormat",
                              format.value
                            )
                          }
                          className={`w-full p-2 text-left rounded-lg border transition-all ${
                            formData.outputPreferences.downloadFormat ===
                            format.value
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 hover:border-neutral-400"
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {format.label}
                          </div>
                          <div className="text-xs opacity-75">
                            {format.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Download Quality
                    </label>
                    <div className="space-y-2">
                      {downloadQualities.map((quality) => (
                        <button
                          key={quality.value}
                          onClick={() =>
                            handleInputChange(
                              "outputPreferences",
                              "downloadQuality",
                              quality.value
                            )
                          }
                          className={`w-full p-2 text-left rounded-lg border transition-all ${
                            formData.outputPreferences.downloadQuality ===
                            quality.value
                              ? "border-neutral-900 bg-neutral-900 text-white"
                              : "border-neutral-300 hover:border-neutral-400"
                          }`}
                        >
                          <div className="font-medium text-sm">
                            {quality.label}
                          </div>
                          <div className="text-xs opacity-75">
                            {quality.description}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="sticky bottom-4">
              <Button
                onClick={handleGenerate}
                disabled={!uploadedFile || isGenerating}
                className="w-full py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-semibold text-lg"
              >
                {isGenerating ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Generating...
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Preview Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-neutral-100 rounded-lg overflow-hidden">
                    {generatedImage ? (
                      <img
                        src={generatedImage}
                        alt="Generated thumbnail"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-neutral-500">
                        <div className="text-center">
                          <svg
                            className="w-12 h-12 mx-auto mb-2"
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
                          <p className="text-sm">
                            Generated thumbnail will appear here
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Results */}
              <AnimatePresence>
                {(inputImage || generatedImage) && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="space-y-4"
                  >
                    {inputImage && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">
                            Original Image
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img
                            src={inputImage}
                            alt="Original"
                            className="w-full rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    )}

                    {generatedImage && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-sm">
                            Generated Thumbnail
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <img
                            src={generatedImage}
                            alt="Generated"
                            className="w-full rounded-lg"
                          />
                          <div className="mt-4 space-y-2">
                            <Button
                              onClick={() => {
                                const link = document.createElement("a");
                                link.href = generatedImage;
                                link.download = `thumbnail-${Date.now()}.${
                                  formData.outputPreferences.downloadFormat
                                }`;
                                link.click();
                              }}
                              className="w-full"
                            >
                              Download Thumbnail
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
