import { useState } from 'react'
import FurnitureList from './components/FurnitureList'
import FurnitureForm from './components/FurnitureForm'
import { Container, Typography } from '@mui/material'

const App = () => {
  const [selectedFurniture, setSelectedFurniture] = useState(null)

  const handleEdit = (furniture: any) => {
    setSelectedFurniture(furniture)
  }

  const handleFormSubmit = () => {
    setSelectedFurniture(null)
  }

  return (
    <Container style={{ display: 'grid', justifyContent: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Добавление фурнитуры
      </Typography>
      <FurnitureForm
        selectedFurniture={selectedFurniture}
        onFormSubmit={handleFormSubmit}
      />
      <Typography variant="h4" gutterBottom>
        Лист фурнитуры
      </Typography>
      <FurnitureList onEdit={handleEdit} />
    </Container>
  )
}

export default App
