const express = require('express')
const router = express.Router()
const db = require('../db')

// GET /companies
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT code, name FROM companies')
        res.json({ companies: result.rows })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// GET /companies/:code
router.get('/:code', async (req, res) => {
    try {
        const result = await db.query('SELECT code, name, description FROM companies WHERE code = $1', [req.params.code])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Company not found' })
        } else {
            const company = result.rows[0]
            const invoiceResult = await db.query('SELECT id FROM invoices WHERE comp_code = $1', [req.params.code])
            const invoices = invoiceResult.rows.map((invoice) => invoice.id)
            res.json({ company: { code: company.code, name: company.name, description: company.description, invoices } })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// POST /companies
router.post('/', async (req, res) => {
    try {
        const { code, name, description } = req.body
        const result = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING *', [code, name, description])
        res.json({ company: result.rows[0] })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// PUT /companies/:code
router.put('/:code', async (req, res) => {
    try {
        const { name, description } = req.body
        const result = await db.query('UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING *', [name, description, req.params.code])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Company not found' })
        } else {
            res.json({ company: result.rows[0] })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

// DELETE /companies/:code
router.delete('/:code', async (req, res) => {
    try {
        const result = await db.query('DELETE FROM companies WHERE code = $1', [req.params.code])
        if (result.rowCount === 0) {
            res.status(404).json({ error: 'Company not found' })
        } else {
            res.json({ status: 'deleted' })
        }
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Internal Server Error' })
    }
})

module.exports = router