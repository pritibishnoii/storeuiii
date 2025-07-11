import { useState, useEffect } from "react";
import AdminMenu from "./AdminMenu";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../redux/api/productsApiSlice";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

const AdminProductUpdate = () => {
  const params = useParams();
  const navigate = useNavigate();


  // Get product data by ID
  const { data: productData } = useGetProductByIdQuery( params._id );
  // console.log(productData);

  // State for form fields
  const [ image, setImage ] = useState( "" );
  const [ name, setName ] = useState( "" );
  const [ description, setDescription ] = useState( "" );
  const [ price, setPrice ] = useState( "" );
  const [ category, setCategory ] = useState( "" );
  const [ quantity, setQuantity ] = useState( "" );
  const [ brand, setBrand ] = useState( "" );
  const [ stock, setStock ] = useState( 0 );
  const [ imagePreview, setImagePreview ] = useState( null );

  // RTK Query hooks
  const { data: categories = [] } = useFetchCategoriesQuery();
  const [ updateProduct ] = useUpdateProductMutation();
  const [ deleteProduct ] = useDeleteProductMutation();

  console.log( categories )

  // Initialize form with product data when it loads
  useEffect( () => {
    if ( productData && productData.product._id ) {
      setName( productData.product.name || "" );
      setDescription( productData.product.description || "" );
      setPrice( productData.product.price || "" );
      setCategory( productData.product.category?._id || "" );
      setQuantity( productData.product.quantity || "" );
      setBrand( productData.product.brand || "" );
      setStock( productData.product.countInStock || 0 );
      setImage( productData.product.image || "" );
      setImagePreview( productData.product.image || null );
    }
  }, [ productData ] );

  const handleSubmit = async ( e ) => {
    e.preventDefault();
    try {
      const formData = new FormData();

      // Only append image if it's a File object (new upload)
      if ( image instanceof File ) {
        formData.append( "image", image );
      }

      formData.append( "name", name );
      formData.append( "description", description );
      formData.append( "price", price );
      formData.append( "category", category );
      formData.append( "brand", brand );
      formData.append( "countInStock", stock );
      formData.append( "quantity", quantity );

      const result = await updateProduct( { productId: params._id, formData } );
      // console.log(result.product.name);
      if ( result.data ) {
        toast.success( `${ result.data.product.name } updated successfully` );
        navigate( "/admin/allproductslist" );
      } else if ( result.error ) {
        toast.error(
          result.error.data?.error || "Product update failed. Try Again"
        );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( "Product update failed. Try Again." );
    }
  };

  const handleDelete = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if ( !answer ) return;

      const result = await deleteProduct( params._id );

      if ( result.data ) {
        toast.success( `${ result.data.name } deleted successfully` );
        navigate( "/admin/allproductslist" );
      } else if ( result.error ) {
        toast.error( "Delete failed. Try again." );
      }
    } catch ( error ) {
      console.error( error );
      toast.error( "Delete failed. Try again." );
    }
  };

  const handleImageChange = ( e ) => {
    const file = e.target.files[ 0 ];
    if ( file ) {
      setImage( file );
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview( reader.result );
      };
      reader.readAsDataURL( file );
    }
  };




  return (
    <div className="xl:ml-[5rem] sm:mx-[0]">
      <div className="flex flex-col md:flex-row">
        <AdminMenu />
        <div className="md:w-3/4 p-3">
          <div className="h-12">Update/Delete Product</div>

          { imagePreview && (
            <div className="text-center">
              <img
                src={ imagePreview }
                alt="product"
                className="max-h-[200px] mx-auto rounded-lg"
              />
            </div>
          ) }

          <div className="mb-3">
            <label className="border text-white px-4 block w-full text-center rounded-lg py-11 font-bold cursor-pointer">
              { image
                ? image instanceof File
                  ? image.name
                  : "Current Image"
                : "Upload Image" }
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={ handleImageChange }
                className="hidden"
              />
            </label>
          </div>

          <div className="p-3">
            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name">Name</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ name }
                  onChange={ ( e ) => setName( e.target.value ) }
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="name block">Price</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ price }
                  onChange={ ( e ) => setPrice( e.target.value ) }
                />
              </div>
            </div>

            <div className="flex flex-wrap">
              <div className="one">
                <label htmlFor="name block">Quantity</label> <br />
                <input
                  type="number"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ quantity }
                  onChange={ ( e ) => setQuantity( e.target.value ) }
                />
              </div>

              <div className="two ml-10">
                <label htmlFor="name block">Brand</label> <br />
                <input
                  type="text"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ brand }
                  onChange={ ( e ) => setBrand( e.target.value ) }
                />
              </div>
            </div>

            <label htmlFor="" className="my-5">
              Description
            </label>
            <textarea
              type="text"
              className="p-2 mb-3 bg-[#101011] border rounded-lg w-[95%] text-white"
              value={ description }
              onChange={ ( e ) => setDescription( e.target.value ) }
            />

            <div className="flex justify-between">
              <div>
                <label htmlFor="name block">Count In Stock</label> <br />
                <input
                  type="number"
                  min="0"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ stock }
                  onChange={ ( e ) => setStock( Number( e.target.value ) ) }
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="">Category</label> <br />
                <select
                  placeholder="Choose Category"
                  className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                  value={ category }
                  onChange={ ( e ) => setCategory( e.target.value ) }
                >
                  <option value="">Select Category</option>
                  { categories?.category?.map( ( c ) => (
                    <option key={ c._id } value={ c._id }>
                      { c.name }
                    </option>
                  ) ) }
                </select>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={ handleSubmit }
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 cursor-pointer"
              >
                Update
              </button>
              <button
                onClick={ handleDelete }
                className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProductUpdate;
