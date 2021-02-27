import React from 'react';
import {API} from "../../backend"

const ImageHelper = ({product}) => {

  const imageUrl = product ? `${API}/product/photo/${product._id}` : "https://redecormyhome.com/wp-content/uploads/2020/06/imageedit_3_8132980001.png"

  return (
  <div className="rounded border border-success p-2">
    <img
      src={imageUrl}
      alt="photo"
      style={{ maxHeight: "100%", maxWidth: "100%" }}
      className="mb-3 rounded"
    />
  </div>
  )
}

export default ImageHelper
