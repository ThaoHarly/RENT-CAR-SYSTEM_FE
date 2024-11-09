import React from "react";

export default function Gifts() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Quà tặng</h2>

        {/* Image and Message */}
        <div className="mb-8">
          <img
            src="https://via.placeholder.com/400x300?text=Gift+Image"
            alt="Gifts Illustration"
            className="mx-auto mb-4"
          />
          <p className="text-gray-500 text-lg">
            Bạn vui lòng sử dụng app Rent Car System để tìm hiểu thêm chi tiết chương
            trình
          </p>
        </div>

        {/* App Store and Google Play Buttons */}
        <div className="flex justify-center space-x-4">
          <a
            href="https://apps.apple.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
              alt="Download on the App Store"
              className="h-12"
            />
          </a>
          <a
            href="https://play.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              className="h-12"
            />
          </a>
        </div>
      </div>
    </div>
  );
}
