const express = require('express')
const router = express.Router()
const db = require('../db')

// GET /invoices
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT id, comp_code FROM invoices')
        res.json({ invoices: result.rows })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// GET /invoices/:id
router.get('/:id', async (req, res) => {
    try {
        const result = await db.query('SELECT id, amt, paid, add_date, paid_date, comp_code FROM invoices WHERE id = $1', [req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Invoice not found' })
        } else {
            const invoice = result.rows[0]
            const companyResult = await db.query('SELECT code, name, description FROM companies WHERE code = $1', [invoice.comp_code])
            const company = companyResult.rows[0]
            res.json({ invoice: { id: invoice.id, amt: invoice.amt, paid: invoice.paid, add_date: invoice.add_date, paid_date: invoice.paid_date, company: { code: company.code, name: company.name, description: company.description } } })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// POST /invoices
router.post('/', async (req, res) => {
    try {
        const { comp_code, amt } = req.body
        const result = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING *', [comp_code, amt])
        res.json({ invoice: result.rows[0] })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// PUT /invoices/:id
router.put('/:id', async (req, res) => {
    try {
        const { amt } = req.body
        const result = await db.query('UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING *', [amt, req.params.id])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Invoice not found' })
        } else {
            res.json({ invoice: result.rows[0] })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// DELETE /invoices/:id
router.delete('/:id', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM invoices WHERE id = $1', [req.params.id])
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Invoice not found' })
        } else {
            res.json({ status: 'deleted' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router