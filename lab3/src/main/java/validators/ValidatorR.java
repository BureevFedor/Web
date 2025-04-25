package validators;

import java.lang.Double;

import javax.faces.application.FacesMessage;
import javax.faces.component.UIComponent;
import javax.faces.context.FacesContext;
import javax.faces.validator.FacesValidator;
import javax.faces.validator.Validator;
import javax.faces.validator.ValidatorException;

@FacesValidator("validatorR")
public class ValidatorR implements Validator {

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object obj) throws ValidatorException {
        if (obj == null) {
            throw new ValidatorException(
                new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "R пустое... ???"));
        }

        double r;

        try {
            r = Double.parseDouble(obj.toString());
        } catch (Exception e) {
            throw new ValidatorException(
                new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "Неправильное значение R."));
        }

        if(r == 0) {
            throw new ValidatorException(
                new FacesMessage(FacesMessage.SEVERITY_ERROR, null,
                    "R не задан."));
        }
    }
}
