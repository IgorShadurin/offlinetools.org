import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function WatermarkToolExplanation() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">How to Use the Watermark Tool</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</span>
                Upload Watermark
              </CardTitle>
              <CardDescription>
                Choose your watermark image (PNG, JPG, WEBP, or GIF)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Select a high-quality image to use as your watermark. The tool will automatically scale it proportionally to fit your target images.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</span>
                Configure Settings
              </CardTitle>
              <CardDescription>
                Adjust position, opacity, scale, and margin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Choose where to place your watermark (corners), adjust transparency, size, and distance from edges.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</span>
                Select Mode
              </CardTitle>
              <CardDescription>
                Choose between batch processing or single image mode
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Batch mode processes multiple images at once. Single image mode allows precise drag-and-drop positioning.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">4</span>
                Process & Download
              </CardTitle>
              <CardDescription>
                Apply watermarks and save your images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Click process to apply watermarks. Download individual images or use "Download All" for batch processing.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Features</h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <h4 className="font-medium">Quality Preservation</h4>
            <p className="text-sm text-muted-foreground">
              High-quality Canvas API processing maintains image quality during watermark application.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Batch Processing</h4>
            <p className="text-sm text-muted-foreground">
              Process multiple images at once with progress tracking and individual download options.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Interactive Positioning</h4>
            <p className="text-sm text-muted-foreground">
              Single image mode allows precise watermark positioning with drag-and-drop on canvas preview.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium">Client-Side Processing</h4>
            <p className="text-sm text-muted-foreground">
              All processing happens in your browser - your images never leave your device.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Tips for Best Results</h3>
        <div className="space-y-3">
          <div className="border-l-4 border-blue-500 pl-4">
            <h4 className="font-medium">Watermark Design</h4>
            <p className="text-sm text-muted-foreground">
              Use PNG images with transparency for best results. Avoid overly complex designs that may become unclear when scaled down.
            </p>
          </div>
          <div className="border-l-4 border-green-500 pl-4">
            <h4 className="font-medium">Opacity Settings</h4>
            <p className="text-sm text-muted-foreground">
              Set opacity between 50-80% for subtle watermarks that don't overpower your content while still being visible.
            </p>
          </div>
          <div className="border-l-4 border-purple-500 pl-4">
            <h4 className="font-medium">Scale Considerations</h4>
            <p className="text-sm text-muted-foreground">
              Keep watermark scale between 10-25% of the image size for optimal visibility without being intrusive.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
