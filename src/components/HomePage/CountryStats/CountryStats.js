import React, {useState} from 'react';
import DataTable from 'react-data-table-component';
import Form from 'react-bootstrap/Form';

function CountryStats({results}) {

  const [searchCountry, setSearchCountry] = useState('');
  const filteredCountry = [];

  results.map(data => {
    if (searchCountry !== '' ? data.country.toLowerCase().includes(searchCountry.toLowerCase()) : null) {
      filteredCountry.push(data);
    }
    return null;
    });

  const customStyles = {
    headRow: {
      style: {
        border: 'none',
      },
    },
    headCells: {
      style: {
        color: 'white',
        fontSize: '20px',
      },
    },
    rows: {
      highlightOnHoverStyle: {
        backgroundColor: 'grey',
        borderBottomColor: '#FFFFFF',
        borderRadius: '25px',
        outline: '1px solid #FFFFFF',
      },
    },
    pagination: {
      style: {
        border: 'none',
      },
    },
  };

  const columns = [
    {
       name: 'Country',
       selector: 'country',
       sortable: true,
       center: true,
    },
    {
      name: 'Cases',
      selector: 'cases',
      sortable: true,
      center: true,
    },
    {
      name: 'Recovered',
      selector: 'recovered',
      sortable: true,
      center: true,
    },
    {
      name: 'Deaths',
      selector: 'deaths',
      sortable: true,
      center: true,
    },
    {
       name: 'TodayCases',
       selector: 'todayCases',
       sortable: true,
       center: true,
    },
    {
      name: 'TodayDeaths',
      selector: 'todayDeaths',
      sortable: true,
      center: true,
    },
    {
      name: 'Active',
      selector: 'active',
      sortable: true,
      center: true,
    },
    {
      name: 'Critical',
      selector: 'critical',
      sortable: true,
      center: true,
    }
  ];

  return (
    <div>
    <Form>
      <Form.Group controlId="formGroupSearch">
        <Form.Control
          type="text"
          placeholder="Search by Country"
          onChange={e => {
            setSearchCountry(e.target.value);
          }}
        />
      </Form.Group>
    </Form>
    <br />
    <DataTable
      columns={columns}
      data={filteredCountry.length < 1 ? results : filteredCountry}
      striped
      responsive
      pagination
      customStyles={customStyles}
      theme={'dark'}
      highlightOnHover
      paginationPerPage={5}
      paginationRowsPerPageOptions={[5, 10, 15]}
    />
    </div>
    //<Columns queries={queries}>
      //{countries}
    //</Columns>
  );
}

export default CountryStats;
