# from django import forms
# from . import models

# class UploadData(forms.ModelForm):

#     def save(self, commit=True):
#         if self.cleaned_data.get('data') is not None:
#             data = self.cleaned_data['data']
#             self.instance.data = data
#         return self.instance

#     class Meta:
#         model = models.Data
#         fields = ['data']
