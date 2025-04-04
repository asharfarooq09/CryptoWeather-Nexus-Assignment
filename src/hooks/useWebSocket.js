import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { updateLivePrice } from '../redux/slice/cryptoSlice'

const useWebSocket = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const socket = new WebSocket('wss://ws.coincap.io/prices?assets=bitcoin,ethereum,solana')

    socket.onmessage = function (message) {
      const data = JSON.parse(message.data)
      dispatch(updateLivePrice(data))
    }

    return () => socket.close()
  }, [dispatch])
}

export default useWebSocket