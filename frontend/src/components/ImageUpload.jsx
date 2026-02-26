
// import React from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { X } from "lucide-react";

// const ImageUpload = ({ productData, setProductData }) => {
      
//   const handleFiles = (e) => {
//     const files = Array.from(e.target.files || []);

//     if (files.length ) {
//       setProductData((prev) => ({
//         ...prev,
//         productImage: [...prev.productImage, ...files], // ✅ append images
//       }));
//     }
//   };

//   const removeImage = (index) => {
//     setProductData((prev) => ({
//       ...prev,
//       productImage: prev.productImage.filter((_, i) => i !== index),
//     }));
//   };

//   return (
//     <div className="grid gap-2">
//       <Label>Product Images</Label>

//       <Input
//         type="file"
//         id="file-upload"
//         accept="image/*"
//         multiple
//         onChange={handleFiles}
//       />

//       <Button variant="outline" type="button">
//         <Label htmlFor="file-upload" className="cursor-pointer">
//           Upload Images
//         </Label>
//       </Button>

//       {productData.productImage.length > 0 && (
//         <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
//           {productData.productImage.map((file, idx) => (
//             <Card key={idx} className="relative group overflow-hidden">
//               <CardContent>
//                 <img
//                   src={URL.createObjectURL(file)}
//                   alt={`Preview ${idx}`}
//                   className="w-full h-32 object-cover rounded-md"
//                 />

//                 <button
//                   type="button"
//                   onClick={() => removeImage(idx)}
//                   className="absolute top-1 right-1 bg-black/60 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
//                 >
//                   <X size={14} />
//                 </button>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ImageUpload;

// // import React from 'react'

// // export default function imageUpload() {
// //   return (
// //     <div>imageUpload</div>
// //   )
// // }
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

const ImageUpload = ({ productData, setProductData }) => {
    if (!productData || !Array.isArray(productData.productImg)) {
    return null; // or a loader
  }
  

  const handleFiles = (e) => {
    const files = Array.from(e.target.files || [])

    if (files.length) {
      setProductData((prev) => ({
        ...prev,
        productImg: [...prev.productImg, ...files],
      }))
    }
  }

  const removeImage = (index) => {
    setProductData((prev) => {
      const updatedImages = prev.productImg.filter((_, i) => i !== index)
      return { ...prev, productImg: updatedImages }
    })
  }

  return (
    <div className="grid gap-2">
      <Label>Product Images</Label>

      <Input
        type="file"
        id="file-upload"
        className="hidden"
        accept="image/*"
        multiple
        onChange={handleFiles}
      />

      <Button variant="outline">
        <label
          htmlFor="file-upload"
          className="cursor-pointer"
        >
          Upload Images
        </label>
      </Button>

      {/* Image Preview */}
      {
  productData.productImg.length > 0 && (
    <div className="grid grid-cols-2 gap-4 mt-3 sm:grid-cols-3">
      {productData.productImg.map((file, idx) => {
        // check if file is already a file (from input) or a DB object/string
        let preview

        if (file instanceof File) {
          preview = URL.createObjectURL(file)
        } else if (typeof file === "string") {
          preview = file
        } else if (file?.url) {
          preview = file.url
        } else {
          return null
        }

        return (
          <Card key={idx} className="relative group overflow-hidden">
            <CardContent>
              <img
                src={preview}
                alt=""
                width={200}
                height={200}
                className="w-full h-32 object-cover rounded-md"
              />

              {/* remove button */}
              <button
                className="absolute top-1 right-1 bg-black/50 text-white p-1 rounded-full
                           opacity-0 group-hover:opacity-100 transition"
              >
                <X size={14} />
              </button>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
     
    </div>
  )
}

export default ImageUpload