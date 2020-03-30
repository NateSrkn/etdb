import React, { useState, useEffect } from 'react'
import { Root, Section } from '../components/Layout'
import { CastList } from '../components/CastList'
import { Image } from '../components/Image'
import { call } from '../api/apiCall'
import { FETCH_SINGULAR_ENDPOINT } from '../api/endpoints'
import { useParams } from 'react-router-dom'

export const TVPage = () => {
  let tvId = useParams()
  let [show, setShow] = useState(null)

  useEffect(() => {
    const fetchShow = async (id) => {
      let options = {
        base: {
          url: FETCH_SINGULAR_ENDPOINT('tv', id),
          method: 'get'
        },
        params: {
          append_to_response: 'credits'
        }
      }
      const showData = await call(options)
      setShow(showData)
    }
    
    fetchShow(tvId.tvId)
  }, [tvId])

  return (
    <React.Fragment>
      <Root>
        <Section>
          {show ? 
          <div className="page-hero">
            <Image src={show.poster_path} alt={show.name} />
            <div className="page-info">
              <h2>{show.name}</h2>
              <div className="description">
                <p>
                  {show.overview}
                </p>
              </div>
            </div>
          </div> 
          : null}
        </Section>
      </Root>
      <Root>
        <Section>
          {show ? <CastList cast={show.credits.cast} /> : null}
        </Section>
      </Root>
    </React.Fragment>
  )
}