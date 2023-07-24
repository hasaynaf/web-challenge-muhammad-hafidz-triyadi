import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'

function Dashboard() {

    const token = localStorage.getItem("token")
    
    const navigate = useNavigate()

    const [product, setProduct] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (!token) navigate('/')
        document.title = 'Web Challange - Beranda'
        getData()
    }, [])

    const getData = async () => {
        await Axios.get(`https://dummyjson.com/products`)
        .then((response) => {
            console.log(response)
            setProduct(response.data.products)
        })
        .catch((error) => {
            console.error(error)
        })
    }

    const _search = () => {
        console.log(search.toUpperCase())
        if (search !== "") {
            if (product.length == 0) getData()
            
            let filtered = product.filter((item) => {
                return (item.title.toUpperCase() == search.toUpperCase())
            })

            setProduct(filtered)
        }
    }
    
    const signout = () => {
        localStorage.clear()
        navigate('/')
    }

    return (
        <div>
            <div className='header'>
                <div>
                    <img src={window.env.PUBLIC_URL + '/header-login.png'} />
                </div>
                <div className='logo'>
                    <img src={window.env.PUBLIC_URL + '/logo.png'} style={{ width: '65%' }} />
                </div>
                <div className='logout'>
                    <button onClick={signout} className='btn-logout'>Log Out</button>
                </div>
            </div>
            <div className='container'>
                <h2>KATALOG</h2>
                <div>
                    <input type='text' style={{width: '100%', padding: '10px'}} value={search} onChange={(e) => setSearch(e.target.value)} onInput={_search}/>
                </div>
                <div className='row'>
                    {product.map((item, index) => (
                        <div className="col">
                            <div className="gallery">
                                <img src={item.thumbnail} style={{ width: '180px', height: '100px' }} />
                                <div className="desc">
                                    <strong>{ item.title }</strong><br/><br/>
                                    <small>{ item.description }</small><br/><br/>
                                    <strong style={{color: 'green'}}>${ item.price }</strong><br/><br/>
                                    <strong style={{color: 'red'}}>{ item.discountPercentage } %</strong><br/><br/>
                                    <strong>Stock { item.stock }</strong><br/><br/>
                                    <strong>Ranting Score { item.rating }</strong><br/><br/>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard