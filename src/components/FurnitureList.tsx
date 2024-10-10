import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material'

const FurnitureList = ({ onEdit }: { onEdit: any }) => {
  const [furniture, setFurniture] = useState<any[]>([])

  useEffect(() => {
    fetchFurniture()
  }, [])

  const fetchFurniture = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/furniture')
      setFurniture(response.data)
    } catch (error) {
      console.error('Error fetching furniture:', error)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:8000/api/furniture/${id}`)
      fetchFurniture()
    } catch (error) {
      console.error('Error deleting furniture:', error)
    }
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>In Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {furniture.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{item.in_stock ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Button
                  onClick={() => onEdit(item)}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(item.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default FurnitureList
