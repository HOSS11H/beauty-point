import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";

const Bounce = keyframes`
    0%, 100%, 20%, 50%, 80% {
        transform:         translateY(0)
    }
    40% {
        transform:         translateY(-20px)
    }
    60% {
        transform:         translateY(-15px)
    }
`;

const CategoryPanelCard = styled.div`
    position: relative;
    text-align: center;
    margin-top: 10px;
    @media screen and (max-width: 899.98px) {
        maz-width: 370px;
        margin: 10px  auto 0;
    }
    &:hover {
        .category-icon {
            i,svg, img {
                animation: ${Bounce} 1s ease-in-out;
            }
        }
    }   
    .category-icon {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 127px;
        height: 127px;
        background: ${({ theme }) => theme.vars.secondary};
        border-radius: 50%;
        margin-bottom: 14px;
        @media screen and (max-width: 899.98px) {
            width:80px;
            height:80px;
        }
        @media screen and (max-width: 599.98px) {
            width:50px;
            height:50px;
        }
        i, svg {
            color: ${({ theme }) => theme.palette.common.white};
            transition: 0.3s ease-in-out;
            font-size: 60px;
            @media screen and (max-width: 899.98px) {
                font-size: 35px
            }
            @media screen and (max-width: 599.98px) {
                font-size: 25px
            }
        }
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
        }
    }
    .category-title {
        a {
            font-size: 20px;
            line-height: 27px;
            font-weight: 500;
            text-transform: capitalize;
            @media screen and (max-width: 599.98px) {
                font-size: 15px
            }
            transition: 0.3s ease-in-out;
            color: ${({ theme }) => theme.palette.text.primary};
            &:hover {
                color: ${({ theme }) => theme.vars.primary};
            }
        }
    }
    .category-num {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        right: 30px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: ${({ theme }) => theme.palette.common.white};
        color: ${({ theme }) => theme.vars.primary};
        font-size: 16px;
        font-weight: 600;
        z-index: 51;
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
`

const CategoryPanel = ({ category, path }) => {

    return (
        <CategoryPanelCard category={category} >
            <div className="category-icon">
                <img src={category.image} alt="Category" />
            </div>
            <div className="category-title">
                <NavLink to={`${path}/${category.id}`}>{category.name}</NavLink>
            </div>
            <div className="category-num" >
                {category.services.length}
            </div>
        </CategoryPanelCard>
    )
}

export default CategoryPanel;