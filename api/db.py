from pynamodb.models import Model
from pynamodb.attributes import (JSONAttribute, UnicodeAttribute, 
UTCDateTimeAttribute, UnicodeSetAttribute, BooleanAttribute)
from datetime import datetime as date
from uuid import uuid4
import os

class Model2(Model):
    def to_dict(self):
        ret_dict = {}
        for name, attr in self.attribute_values.items():
            ret_dict[name] = self._attr_to_obj(attr)
        return ret_dict
    
    def _attr_to_obj(self, attr):
        if isinstance(attr, date):
            return attr.timestamp()
        elif isinstance(attr, list):
            return [self._attr_to_obj(l) for l in attr]
        elif isinstance(attr, set):
            return [self._attr_to_obj(v) for v in attr]
        # elif isinstance(attr, MapAttribute): return {k: self._attr_to_obj(v) for k, v in attr.attribute_values.items()}
        else:
            return attr        

class Config:
    host = os.environ.get("POLYLANG_DB_URL", "http://localhost:8000")
    aws_access_key_id = os.environ.get('POLYLANG_AWS_ACCESS_KEY_ID', 'fake')
    aws_secret_access_key = os.environ.get('POLYLANG_AWS_SECRET_ACCESS_KEY', 'fake')

class CodeTable(Model2):
    class Meta(Config):
        table_name = 'code'
    snippet_id = UnicodeAttribute(hash_key=True)
    private = BooleanAttribute(default=False)
    code = UnicodeAttribute()
    owner = UnicodeAttribute(default="guest")
    lang = UnicodeAttribute()
    org = UnicodeSetAttribute(default=set())
    users_with_access = UnicodeSetAttribute(default=set())
    date = UTCDateTimeAttribute()

def create_code_snippet(snippet_id, code, owner, lang, org, private):
    CodeTable(snippet_id=snippet_id, private=private, code=code, owner=owner, 
              lang=lang, org=org, date=date.utcnow()).save()

def update_code_snippet(snippet_id, code):
    code_snippet = CodeTable.get(snippet_id)
    code_snippet.update(actions=[ code_snippet.code.set(code) ])

def get_code_snippet(snippet_id):
    code_snippet = CodeTable.get(snippet_id)
    code_snippet.update(actions=[ code_snippet.code.set(code) ])

if not CodeTable.exists():
    CodeTable.create_table(read_capacity_units=1, write_capacity_units=1, wait=True)