import { useEffect, useState } from 'react'
import {Typography, Input, List, Card, Image} from "antd";
import './App.css'

function App() {
  const[searchedText, setSearchedText ] = useState("") ; 
  const[dataSource, setDataSource ] = useState([])  ;
  const[loading, setLoading ] = useState(false)  ;
  
  useEffect(() => {
    setLoading(true)
    //API calls
    fetch(`https://dummyjson.com/products/search?q=${searchedText}`) 
    .then ((res) => res.json()) 
    .then( (response) => {
      setLoading(false)
      setDataSource(response.products)
    });
  }, [searchedText])

  return (
    <>
      <Typography.Title style = {{textAlign: "center", fontFamily: "cursive"}}>Images Stock</Typography.Title>
      <Input.Search style= {{ maxWidth:500, display:"flex", margin: "auto"  }} 
      onSearch= {(value) => {
         setSearchedText(value)
      }}
      ></Input.Search>
      <List 
      loading={loading}
      dataSource={dataSource} 
      grid={{xs:1, sm:2, md:3, lg:4, xl:5, xxl:6}}
      renderItem={(item) => {
        return (<Card key={item.id} title={item.title}  >
          <Image src={item.thumbnail}  ></Image>  
          <text style={{display:"none"}} > Description : {item.description}</text>
        </Card>
        );
      }} > </List>
    </>
  )
}


export default App
