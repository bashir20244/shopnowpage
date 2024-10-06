import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Dropdown } from 'react-bootstrap';
import Logo from '../../assets/Logo/logo nabtaty-08.png';
import cart from '../../assets/images/bi_cart.svg';
import heart from '../../assets/images/heart.svg';
import dummyData from '../../components/ui/dummyData/dummyData'; 
// import { addToCart } from '../../../store/slice/cartReducer';
import { addToCart } from '../../store/slice/cartReducer';
import { addToFavorites } from '../../store/slice/favoritesSlice';
import { toast } from 'react-toastify';
import { Card } from 'react-bootstrap';

import './ShopNow.css';
import categoryImg08 from "../../assets/images/2619fafceaedd791a39fd2a196ec0641a.png";

const ShopNow = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortType, setSortType] = useState('default');

  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    toast.success(`${item.display} تم إضافته إلى السلة بنجاح!`);
  };

  const handleAddToFavorites = (item) => {
    dispatch(addToFavorites(item));
    toast.info(`${item.display} تم إضافته إلى المفضلة!`);
  };

  // تصفية العناصر بناءً على الفئة وطريقة التصفية
  const getFilteredData = () => {
    let filteredData = selectedCategory === 'All'
      ? dummyData // عرض جميع العناصر إذا تم اختيار "All"
      : dummyData.filter((categoryData) => categoryData.category === selectedCategory);
    
    // تطبيق التصفية بناءً على نوع التصفية
    if (sortType === 'price-desc') {
      filteredData = filteredData.map(categoryData => ({
        ...categoryData,
        items: categoryData.items.sort((a, b) => b.price - a.price),
      }));
    } else if (sortType === 'price-asc') {
      filteredData = filteredData.map(categoryData => ({
        ...categoryData,
        items: categoryData.items.sort((a, b) => a.price - b.price),
      }));
    } else if (sortType === 'az') {
      filteredData = filteredData.map(categoryData => ({
        ...categoryData,
        items: categoryData.items.sort((a, b) => a.name.localeCompare(b.name)),
      }));
    } else if (sortType === 'za') {
      filteredData = filteredData.map(categoryData => ({
        ...categoryData,
        items: categoryData.items.sort((a, b) => b.name.localeCompare(a.name)),
      }));
    }
    
    return filteredData;
  };

  const handleSortChange = (sortKey) => {
    setSortType(sortKey);
  };

  const filteredData = getFilteredData();

  return (
    <Container className="category-page">
      <Row>
        <Col md={3} className="category-menu">
          <h5 className='filter'>Filters</h5>
          <div className='cat-title'>
          <h3 id="categories">Categories</h3>
          </div>
          
          <br />
          
          <h4 className="slides-title" onClick={() => setSelectedCategory('All')}>All</h4>
          {dummyData.map((categoryData) => (
            <h4
              key={categoryData.category}
              className="slides-title"
              onClick={() => setSelectedCategory(categoryData.category)}
            >
              {categoryData.category}
            </h4>
          ))}
        </Col>

        <Col md={9} className="category-details">
          <div className="title">
            <img src={Logo} alt="Logo" />
            <h1>{selectedCategory === 'All' ? 'All Categories' : selectedCategory}</h1>
          </div>

          <Dropdown className="mb-3">
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Default Sort
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleSortChange('az')}>A to Z</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('za')}>Z to A</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('price-desc')}>Max price</Dropdown.Item>
              <Dropdown.Item onClick={() => handleSortChange('price-asc')}>Min price</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Row>
            {filteredData.length === 0 ? (
              <p>No items found for this category</p>
            ) : (
              filteredData.map((categoryData) =>
                categoryData.items.map((item) => (
                  <Col md={3} sm={6} xs={12} key={item.id} className="mb-4"> 
                    <Card className="card__review m-2 p-2 border-0 position-relative">
              <div className="position-relative">
              
                <Card.Img variant="top" src={categoryImg08} className="top-card" /> 
                <Card.Text>
                  {item.description}
                  </Card.Text>
                
                
                
                <img
                  src={heart}
                  alt="heart"
                  onClick={() => handleAddToFavorites(item)}
                  style={{ cursor: 'pointer' }}
                  className='hearts'
                />
              </div>
              <Card.Body className="card-body">
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <h6>{item.display}</h6>
                </Card.Title>
                <Card.Text>{item.text}</Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="price">${item.price}</span>
                  <img
                    src={cart}
                    alt="cart"
                    onClick={() => handleAddToCart(item)}
                    style={{ cursor: 'pointer' }}
                    className="cart-icon"
                  />
                </div>
              </Card.Body>
            </Card>
                    
                  </Col>
                ))
              )
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ShopNow;
