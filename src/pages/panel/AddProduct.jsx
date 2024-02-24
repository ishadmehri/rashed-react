import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Paper, Snackbar, Stack, TextField, Typography, colors } from '@mui/material'
import { AuthContext } from '../auth/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import PanelSidebar from './PanelSidebar'
import PanelMain from './PanelMain'
import { Editor } from '@tinymce/tinymce-react'
import { DateTimePicker } from '@mui/x-date-pickers'
import moment from 'moment'

export default function AddProduct() {
    const location = useLocation()
    const { loginUser } = useContext(AuthContext)
    //snackbar options (alert)
    const[snackbarOption,setSnackbarOption] = useState({
        open: false,
        message:"",
    })
    const handleClose = (e,reason)=>{
        if(reason === 'clickaway') return;
        setSnackbarOption({...snackbarOption,open:false})
    }
    //set new Product
    const [productInfo, setProductInfo] = useState(
        {
            // name: "",
            // description: "",
            // price: 0,
            shopkeeperId: loginUser?._id,
            categoryId: [],
            // quantity: 0,
            // discountPrice: 0,
            // startDiscountDate: "",
            // endDiscountDate: "",
        }
    )
    useEffect(() => {
        console.log('productInfo', productInfo)
    }, [productInfo])
    //editor
    const editorRef = useRef(null);
    // const getData = () => {
    //     if (editorRef.current) {
    //         console.log(editorRef.current.getContent());
    //     }
    // };

    //loading categories
    const [categories, setCategories] = useState()
    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_API_URL + '/category')
            .then(res => res.json())
            .then(data => {
                console.log(data)
                data.success && setCategories(data.data)
            })
    }, [])
    //upload and convert image to base64
    const [image, setImage] = useState(null)
    const [base64Image, setBase64Image] = useState()
    const handleImageChange = useCallback((e) => {
        const file = e.target.files[0]
        setImage(file)
        const reader = new FileReader()
        reader.onloadend = () => {
            console.log(reader.result)
            setBase64Image(reader.result)
            setProductInfo({...productInfo,images:[reader.result]})
        }
        reader.readAsDataURL(file)
    }, [])
    //send data to API
    const handleSubmit = async ()=>{
        fetch(process.env.REACT_APP_BACKEND_API_URL+'/product',{
            method: "POST",
            headers:{
                'Content-type':'Application/json',
                'Authorization': `Bearer ${loginUser.token}`
            },
            body: JSON.stringify(productInfo)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.success){
                setSnackbarOption({...snackbarOption,open:true,message:"محصول ساخته شده"})
            }
        })
        .catch(err=>{
            setSnackbarOption({...snackbarOption,open:true,message:"خطا در ایجاد محصول. لطفا کنسول را چک کنید."})
            console.log(err)
        })
    }
    return (
        !loginUser?.token ? <Navigate to="/login" /> :
            <>
                <Stack flexDirection="row" justifyContent="flex-end" sx={{ backgroundColor: colors.blueGrey[900] }}>
                    {/* panel sidebar */}
                    <PanelSidebar location={location} />
                    {/* panel Main */}
                    <PanelMain>
                        <Stack className='add-product' direction="row" sx={{ gap: "16px" }}>
                            <Stack sx={{ width: "75%", gap: "16px" }}>
                                {/* {title} */}
                                <TextField name="name" label="عنوان محصول" size='small' variant="filled" sx={{
                                    '& legend': { textAlign: "right" }, '& label': { left: "unset", right: 24 },
                                    '& .MuiInputBase-input': { direction: "rtl !important" }
                                }}
                                    onChange={e => setProductInfo({ ...productInfo, name: e.target.value })}
                                />
                                {/* Description */}
                                <Editor
                                    tinymceScriptSrc={process.env.PUBLIC_URL + '/plugins/tinymce/tinymce.min.js'}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue=""
                                    init={{
                                        height: 500,
                                        menubar: false,
                                        directionality: "rtl",
                                        plugins: [
                                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'directionality'
                                        ],
                                        toolbar: 'undo redo | blocks | ' +
                                            'bold italic forecolor | ltr rtl | alignleft aligncenter ' +
                                            'alignright alignjustify | bullist numlist outdent indent | ' +
                                            'removeformat | help',
                                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                    }}
                                    onEditorChange={(newValue, editor) => {
                                        // console.log(newValue)
                                        setProductInfo({ ...productInfo, description: newValue })
                                        // console.log(editor.getContent({format:'text'}))
                                    }}
                                />

                            </Stack>
                            <Stack sx={{ width: "22%", boxSizing: "border-box", gap: "16px" }} px={2}>
                                {/* submit button */}
                                <Button variant='contained' size='large' disableElevation onClick={handleSubmit}>ثبت محصول</Button>
                                {/* category select */}
                                <Stack component={Paper} elevation={0} p={2}>
                                    <Typography fontWeight={600}>انتخاب دسته بندی</Typography>
                                    {
                                        categories?.length && categories.map(cat => <FormControlLabel key={cat._id}
                                            label={cat.name}
                                            control={
                                                <Checkbox
                                                    inputProps={{
                                                        'data-categoryid': cat._id
                                                    }}
                                                    onChange={(e) => {
                                                        const catId = e.target.getAttribute('data-categoryid')
                                                        let newCategoryIds = productInfo?.categoryId
                                                        if (e.target.checked) {
                                                            newCategoryIds.push(catId);
                                                        }
                                                        else {
                                                            newCategoryIds.pop(catId)
                                                        }
                                                        setProductInfo({ ...productInfo, categoryId: newCategoryIds })
                                                    }}
                                                />
                                            }

                                        />)
                                    }

                                </Stack>
                                {/* product image */}
                                <Stack component={Paper} elevation={0} p={2} spacing={2}>
                                    <Typography fontWeight={600}>آپلود تصویر</Typography>
                                    {base64Image && <Box component="img" src={base64Image} sx={{ width: "100%", height: "150px", objectFit: 'contain' }} alt="" />}
                                    <Button component="label" variant='outlined' size='large' disableElevation>آپلود تصویر <input type="file" hidden onChange={handleImageChange} /></Button>
                                </Stack>
                            </Stack>

                        </Stack>
                        {/* product options */}
                        <Stack flexDirection="row" my={2} sx={{ width: "50%", gap: "16px", '& .MuiTextField-root': { width: "47%", backgroundColor: "#fff" } }} flexWrap="wrap">
                            <TextField label="قیمت" type='number' name="price" min={0} onChange={e => setProductInfo({ ...productInfo, price: e.target.value })} defaultValue={0} />
                            <TextField label="تعداد" type='number' name="quantity" min={0} onChange={e => setProductInfo({ ...productInfo, quantity: e.target.value })} defaultValue={0} />
                            <TextField label="قیمت حراج" type='number' name="discountPrice" onChange={e => {
                                console.log(typeof(e.target.value))
                                if(e.target.value=="") {
                                    console.log('empty')
                                    let {discountPrice, newProduct} = productInfo
                                    return setProductInfo(newProduct)
                                }
                                if(e.target.value == 0  || e.target.value < productInfo.price) {
                                    return setProductInfo({...productInfo, discountPrice :e.target.value})
                                }
                                else if (parseInt(e.target.value)>= parseInt(productInfo.price)) {
                                    console.log('error')
                                    setSnackbarOption({...snackbarOption,open:true,message:"قیمت حراج باید کمتر از قیمت اصلی باشد."})
                                    e.target.value = null
                                    delete productInfo.discountPrice
                                }
                                
                                
                            }} />
                            <DateTimePicker label="تاریخ شروع حراج"  disabled={!productInfo?.discountPrice} onChange={e => {
                                console.log(e.toDate())
                                setProductInfo({ ...productInfo,startDiscountDate:e.toDate() })
                            }} />
                            <DateTimePicker label="تاریخ پایان حراج" disabled={!productInfo?.discountPrice} onChange={e => {
                                if(e.isAfter(productInfo.startDiscountDate)){
                                    setProductInfo({...productInfo,endDiscountDate:e.toDate()})
                                }
                                else{
                                    setSnackbarOption({...snackbarOption,open:true,message:"تاریخ پایان باید بعد از تاریخ آغاز باشد!"})
                                }
                            }} />
                            <Snackbar
                                open={snackbarOption.open}
                                autoHideDuration={2000}
                                message={snackbarOption.message}
                                onClose={handleClose}
                            />
                        </Stack>
                    </PanelMain>
                </Stack >
            </>
    )
}
