import React, { useContext, useEffect, useRef, useState } from 'react'
import { Box, Button, Checkbox, FormControlLabel, Paper, Stack, TextField, Typography, colors } from '@mui/material'
import { AuthContext } from '../auth/AuthContext'
import { Navigate, useLocation } from 'react-router-dom'
import PanelSidebar from './PanelSidebar'
import PanelMain from './PanelMain'
import { Editor } from '@tinymce/tinymce-react'
import { DateTimePicker } from '@mui/x-date-pickers'

export default function AddProduct() {
    const location = useLocation()
    const { loginUser } = useContext(AuthContext)
    const [productInfo, setProductInfo] = useState(
        {
            name: "",
            description: "",
            price: 0,
            shopkeeperId: "",
            categoryId: [],
            quantity: 0,
            discountPrice: 0,
            startDiscountDate: "",
            endDiscountDate: "",
        }
    )
    //editor
    const editorRef = useRef(null);
    const getData = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

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
                                <TextField name="name" label="عنوان محصول" size='small' variant="filled" sx={{
                                    '& legend': { textAlign: "right" }, '& label': { left: "unset", right: 24 },
                                    '& .MuiInputBase-input': { direction: "rtl !important" }
                                }} />
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
                                />

                            </Stack>
                            <Stack sx={{ width: "22%", boxSizing: "border-box", gap: "16px" }} px={2}>
                                <Button variant='contained' size='large' disableElevation>ثبت محصول</Button>
                                {/* category select */}
                                <Stack component={Paper} elevation={0} p={2}>
                                    <Typography fontWeight={600}>انتخاب دسته بندی</Typography>
                                    {
                                        categories?.length && categories.map(cat => <FormControlLabel key={cat._id}
                                            label={cat.name}
                                            control={
                                                <Checkbox
                                                    checked={false}
                                                    // indeterminate={true}
                                                    onChange={() => { }}
                                                />
                                            }
                                        />)
                                    }

                                </Stack>
                                <Stack component={Paper} elevation={0} p={2} spacing={2}>
                                    <Typography fontWeight={600}>آپلود تصویر</Typography>
                                    {false && <Box component="img" src='' sx={{width:"100%",height:"150px", objectFit:'contain'}} alt="" />}
                                    <Button component="label" variant='outlined' size='large' disableElevation>آپلود تصویر <input type="file" hidden /></Button>
                                </Stack>
                            </Stack>

                        </Stack>
                        <Stack flexDirection="row" my={2} sx={{ width: "50%", gap: "16px", '& .MuiTextField-root': { width: "47%", backgroundColor: "#fff" } }} flexWrap="wrap">
                            <TextField label="قیمت" type='number' name="price" onChange={e => setProductInfo({ ...productInfo })} defaultValue={0} />
                            <TextField label="تعداد" type='number' name="quantity" onChange={e => setProductInfo({ ...productInfo })} defaultValue={0} />
                            <TextField label="قیمت حراج" type='number' name="discountPrice" onChange={e => setProductInfo({ ...productInfo })} defaultValue={0} />
                            <DateTimePicker label="تاریخ شروع حراج" onChange={e => setProductInfo({ ...productInfo })} />
                            <DateTimePicker label="تاریخ پایان حراج" onChange={e => setProductInfo({ ...productInfo })} />
                        </Stack>
                    </PanelMain>
                </Stack >
            </>
    )
}
