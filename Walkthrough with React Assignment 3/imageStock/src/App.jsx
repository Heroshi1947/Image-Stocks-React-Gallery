import React, { useEffect, useState } from 'react';
import { Typography, Input, List, Card, Image } from 'antd';
import './App.css';

function App() {
  const [searchedText, setSearchedText] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    setLoading(true);
    //API calls
    fetch(`https://dummyjson.com/products/search?q=${searchedText}`)
      .then((res) => res.json())
      .then((response) => {
        setLoading(false);
        setDataSource(response.products);
      });
  }, [searchedText]);

  const handleImageClick = (itemId) => {
    setSelectedItemId(itemId === selectedItemId ? null : itemId);
  };

  return (
    <>
      <Typography.Title style={{ color:"red", textAlign: 'center', fontFamily: 'cursive' }}>
        Images Stock
      </Typography.Title>
      <Input.Search
        style={{ maxWidth: 500, display: 'flex', margin: 'auto' }}
        onSearch={(value) => {
          setSearchedText(value);
        }}
      />
      <List
        loading={loading}
        dataSource={dataSource}
        grid={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 5, xxl: 6 }}
        renderItem={(item) => {
          const isSelected = item.id === selectedItemId;
          return (
            <Card
              style={{height: 350 , margin:13}}

              key={item.id}
              title={item.title}
              onClick={() => handleImageClick(item.id)}
              className={isSelected ? 'selected' : ''}
            >
              <Image src={item.thumbnail} 
              />
              {isSelected && <p>{item.description}</p>}
            </Card>
          );
        }}
      ></List>
      
    </>
  );
}

export default App;