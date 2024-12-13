import React, { useState, useEffect } from "react";
import axiosClient from "../../API/axiosClient";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReviews = async () => {
    try {
      setIsLoading(true);
      const response = await axiosClient.get(
        "/Review?pageNumber=1&pageSize=10"
      );
      console.log("response.data", response); // Debugging the API response
      setReviews(response || []); // Assume response.data is an array
    } catch (err) {
      setError("Failed to load reviews.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-semibold text-gray-900">Reviews</h1>
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Customer Reviews
          </h2>
        </div>
        <div className="border-t border-gray-200">
          <ul className="divide-y divide-gray-200">
            {reviews.map((review) => (
              <li key={review.reviewId} className="px-4 py-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-indigo-600">
                      Customer ID: {review.cusId}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Vehicle ID: {review.vehicleId}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Rating: <span className="font-bold">{review.rating}</span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      Comment: {review.comment}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ReviewList;
