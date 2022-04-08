import { Formik, Form, Field } from 'formik'
import { useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'EL nombre es muy largo')
            .required("El nombre del Cliente es obligatorio"),
        empresa: Yup.string()
            .required("El nombre de la Emresa es obligatorio"),
        email: Yup.string()
            .email("Email no valido")
            .required("El email es obligatorio"),
        telefono: Yup.number()
            .positive("El numero no es valido")
            .integer("El numero no es valido")
            .typeError("El numero no es valido")
    });

    const handleSubmit = async values => {

        try {
            let url = 'http://localhost:4000/clientes';
            const option = {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    "Content-Type": "application/json"
                }
            };
            if (cliente.id) {
                url = `http://localhost:4000/clientes/${cliente.id}`;
                option.method = 'PUT';
            }

            const respuesta = await fetch(url, option);
            const resultado = await respuesta.json();
            navigate('/clientes');
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return (
        cargando ? <Spinner /> :
            <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
                <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                    {cliente?.nombre ? 'Editar Ciente' : 'Agregar Cliente'}
                </h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? '',
                        empresa: cliente?.empresa ?? '',
                        email: cliente?.email ?? '',
                        telefono: cliente?.telefono ?? '',
                        notas: cliente?.notas ?? ''
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors }) => (
                        <Form
                            className='mt-10'
                        >
                            <div className='mb-4'>
                                <label
                                    className="text-gray-800"
                                    htmlFor='nombre'
                                >
                                    Nombre:
                                </label>
                                <Field
                                    id="nombre"
                                    name='nombre'
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Ingrese nombre del cliente"
                                />
                                {errors.nombre ? (
                                    <Alerta>{errors.nombre}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label
                                    className="text-gray-800"
                                    htmlFor='empresa'
                                >
                                    Empresa:
                                </label>
                                <Field
                                    id="empresa"
                                    name="empresa"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Ingrese empresa del cliente"
                                />
                                {errors.empresa ? (
                                    <Alerta>{errors.empresa}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label
                                    className="text-gray-800"
                                    htmlFor='email'
                                >
                                    Email:
                                </label>
                                <Field
                                    id="email"
                                    name="email"
                                    type="email"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Email del cliente"
                                />
                                {errors.email ? (
                                    <Alerta>{errors.email}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label
                                    className="text-gray-800"
                                    htmlFor='telefono'
                                >
                                    Telefono:
                                </label>
                                <Field
                                    id="telefono"
                                    name="telefono"
                                    type="tel"
                                    className="mt-2 block w-full p-3 bg-gray-50"
                                    placeholder="Telefono del cliente"
                                />
                                {errors.telefono ? (
                                    <Alerta>{errors.telefono}</Alerta>
                                ) : null}
                            </div>
                            <div className='mb-4'>
                                <label
                                    className="text-gray-800"
                                    htmlFor='notas'
                                >
                                    Notas:
                                </label>
                                <Field
                                    as="textarea"
                                    id="notas"
                                    name="notas"
                                    type="text"
                                    className="mt-2 block w-full p-3 bg-gray-50 h-40"
                                    placeholder="Notas del cliente"
                                />
                            </div>

                            <input
                                type="submit"
                                value={cliente?.nombre ? 'Editar Ciente' : 'Agregar Cliente'}
                                className='mt-5 w-full bg-blue-800 text-white p-3 uppercase font-bold text-lg'
                            />
                        </Form>
                    )}

                </Formik>
            </div>
    )
}

Formulario.defaultProps = {
    cliente: {},
    cargando: false
}

export default Formulario
