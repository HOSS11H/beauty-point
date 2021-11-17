import { CustomModal } from '../../../../../../components/UI/Modal/Modal';
import DOMPurify from "dompurify";
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grid } from '@mui/material';

const ProductImg = styled.div`
    width: 100%;
    height: 200px;
    border-radius: 10px;
    flex-shrink: 0;
    cursor: pointer;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 10px;
    }
`
const ProductData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    text-align: left;
`
const ProductDataHeading = styled.p`
    font-size: 15px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 600;
    color: ${({ theme }) => theme.palette.text.primary};
    margin-bottom: 5px;
`

const ProductDataInfo = styled.p`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    margin-bottom: 0px;
`
const ProductDesc = styled.div`
    font-size: 14px;
    line-height:1.5;
    text-transform: capitalize;
    font-weight: 500;
    color: ${({ theme }) => theme.palette.text.disabled};
    p {
        font-size: 14px;
        line-height:1.5;
        text-transform: capitalize;
        font-weight: 500;
        color: ${({ theme }) => theme.palette.text.disabled};
    }
`



const ViewModal = (props) => {

    const { show, heading, confirmText, onConfirm, onClose, id, fetchedProducts } = props;

    const { t } = useTranslation();

    const productIndex = fetchedProducts.data.findIndex(product => product.id === id);

    const productData = fetchedProducts.data[productIndex];

    console.log(productData);
    let content;

    if (productData) {
        const mySafeHTML = DOMPurify.sanitize(productData.description);
        content = (
            <Grid container  spacing={2}>
                <Grid item xs={12} md={6}>
                    <ProductImg>
                        <img src={productData.product_image_url} alt="product" />
                    </ProductImg>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('product name')}</ProductDataHeading>
                                <ProductDataInfo>{productData.name}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('quantity')}</ProductDataHeading>
                                <ProductDataInfo>{productData.quantity}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('original price')}</ProductDataHeading>
                                <ProductDataInfo>{productData.formated_price}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('price after discount')}</ProductDataHeading>
                                <ProductDataInfo>{productData.formated_discounted_price}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('discount type')}</ProductDataHeading>
                                <ProductDataInfo>{productData.discount_type}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                        <Grid item xs={6}>
                            <ProductData>
                                <ProductDataHeading>{t('discount value')}</ProductDataHeading>
                                <ProductDataInfo>{productData.discount}</ProductDataInfo>
                            </ProductData>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <ProductData>
                        <ProductDataHeading>{t('description')}</ProductDataHeading>
                        <ProductDesc dangerouslySetInnerHTML={{ __html: mySafeHTML }} />
                    </ProductData>
                </Grid>
            </Grid>
        )
    }

    return (
        <CustomModal show={show} heading={heading} confirmText={confirmText} onConfirm={onConfirm} onClose={onClose} >
            {content}
        </CustomModal>
    )
}

export default ViewModal;