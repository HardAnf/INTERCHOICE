import React from 'react'
import './ProfilePage.css'
import userPhoto from './pagesImages/noPhotoUser.png'

export const ProfilePage = () => {
    document.body.style = 'background: #474763ca;'

    return (
        <div className='PageContent'>
            <div style={{ maxWidth: '85%', margin: 'auto' }}>
                <div className='ProfilePageDiv'>
                    <div>
                        <label style={{ fontFamily: 'impact', fontSize: 35, color: '#FFFFFF' }}>
                            МОЙ ПРОФИЛЬ
                        </label>
                    </div>

                    <div
                        className='leftDiv'
                        style={{ width: '40%', float: 'right', padding: '10px' }}
                    >
                        <div>
                            {/* <label style={{ fontFamily: "impact", fontSize: 30, color: '#FFFFFF' }} >Имя</label> */}

                            <label style={{ fontSize: 30, color: '#FFFFFF' }}> Иван Иванов </label>
                        </div>

                        <div style={{ marginTop: 50 }}>
                            <label style={{ fontFamily: 'impact', fontSize: 20, color: '#FFFFFF' }}>
                                E-mail:{' '}
                            </label>

                            <label style={{ margin: 10, fontSize: 20, color: '#FFFFFF' }}>
                                {' '}
                                profile@yandex.ru{' '}
                            </label>
                        </div>

                        <div>
                            <label style={{ fontFamily: 'impact', fontSize: 20, color: '#FFFFFF' }}>
                                {' '}
                                Возраст{' '}
                            </label>

                            <label style={{ margin: 10, fontSize: 20, color: '#FFFFFF' }}>
                                {' '}
                                28 лет{' '}
                            </label>
                        </div>

                        <div>
                            <label style={{ fontFamily: 'impact', fontSize: 20, color: '#FFFFFF' }}>
                                {' '}
                                Страна{' '}
                            </label>

                            <label style={{ margin: 10, fontSize: 20, color: '#FFFFFF' }}>
                                {' '}
                                Россия{' '}
                            </label>
                        </div>
                    </div>
                    {/* right div */}

                    <div
                        className='rightDiv'
                        style={{ width: '60%', float: 'left', padding: '10px' }}
                    >
                        <img src={userPhoto} style={{ height: 300 }}></img>
                    </div>
                    {/* left div */}
                </div>

                <div>
                    <a
                        className='btn-large'
                        style={{
                            background: '#5695b094',
                            float: 'right',
                            marginTop: '15px',
                            'border-radius': '20px',
                            fontFamily: 'franklin gothic medium',
                            fontSize: 13
                        }}
                        // onClick={sendFile()}
                    >
                        Изменить настройки профиля
                    </a>
                </div>
            </div>
        </div>
    )
}
