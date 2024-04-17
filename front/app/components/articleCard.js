import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material'
import Date from '@/app/components/date'
import Link from 'next/link'

export default function ArticleCard({ article }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <CardActionArea style={{ flexGrow: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={article.image_href}
          alt={article.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {article.summary}
          </Typography>
          <Typography variant="h8" className="absolute right-3 mt-1 mr-1">
            <Date dateString={article.published} />
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link href={`${article.link}`} style={{ textDecoration: 'none' }}>
          <Button size="small" color="primary">
            More info
          </Button>
        </Link>
      </CardActions>
    </Card>
  )
}
