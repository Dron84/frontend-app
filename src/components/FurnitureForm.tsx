import { useState, useEffect } from 'react'
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Paper,
  Box,
} from '@mui/material'
import axios from 'axios'

const FurnitureForm = ({
  selectedFurniture,
  onFormSubmit,
}: {
  selectedFurniture: any
  onFormSubmit: any
}) => {
  const [furniture, setFurniture] = useState<any>({
    name: '',
    description: '',
    price: '',
    in_stock: false,
  })

  useEffect(() => {
    if (selectedFurniture) {
      setFurniture(selectedFurniture)
    }
  }, [selectedFurniture])

  const handleChange = (e: any) => {
    setFurniture({
      ...furniture,
      [e.target.name]: e.target.value,
    })
  }

  const handleCheckboxChange = (e: any) => {
    setFurniture({
      ...furniture,
      in_stock: e.target.checked,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      if (furniture.id) {
        await axios.put(
          `${location.origin}/api/furniture/${furniture.id}`,
          furniture,
        )
      } else {
        await axios.post(`${location.origin}/api/furniture`, furniture)
      }
      onFormSubmit()
    } catch (error) {
      console.error('Error saving furniture:', error)
    }
  }

  return (
    <Paper elevation={3} sx={{ padding: 2 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Name"
          name="name"
          value={furniture.name}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          name="description"
          value={furniture.description}
          onChange={handleChange}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Price"
          name="price"
          value={furniture.price}
          onChange={handleChange}
          type="number"
          required
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={furniture.in_stock}
              onChange={handleCheckboxChange}
            />
          }
          label="In Stock"
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          {furniture.id ? 'Update Furniture' : 'Add Furniture'}
        </Button>
      </Box>
    </Paper>
  )
}

export default FurnitureForm
